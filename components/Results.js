import { useState, useRef } from "react";
import { useRouter } from "next/router";
import bn from "bignumber.js";
import Button from "@material-ui/core/Button";

import Block from "@components/Block";

const copyInputId = "for-copy";

const renderPy = (py) => {
  const className = py.isPositive() ? "gain" : "loss";
  return (
    <span className={className}>
      {py.isPositive() && "+"}
      {py.toFixed()}%
      <style jsx>{`
        .gain {
          color: var(--color-gain);
        }
        .loss {
          color: var(--color-loss);
        }
      `}</style>
    </span>
  );
};

const renderTerm = (pyHold, pyPool) => {
  let text = "";
  let number = null;
  let className = "gain";
  if (pyHold.isPositive() && pyPool.isPositive())
    if (pyHold.isGreaterThan(pyPool)) {
      text = "少賺";
      number = pyHold.minus(pyPool);
      className = "loss";
    } else {
      text = "多賺";
      number = pyPool.minus(pyHold);
      className = "gain";
    }
  else if (pyHold.isNegative() && pyPool.isNegative())
    if (pyHold.isGreaterThan(pyPool)) {
      text = "多賠";
      number = pyHold.minus(pyPool);
      className = "loss";
    } else {
      text = "少賠";
      number = pyPool.minus(pyHold);
      className = "gain";
    }
  else if (pyHold.isPositive() && pyPool.isNegative()) {
    text = "沒賺到錢還倒賠";
    number = pyPool.abs();
    className = "loss";
  } else if (pyHold.isNegative() && pyPool.isPositive()) {
    text = "沒賠到錢還多賺";
    number = pyPool;
    className = "gain";
  }

  return (
    <span className={className}>
      {text}
      {number?.toFixed(2)}%
      <style jsx>{`
        span {
          font-weight: bold;
        }
        .gain {
          color: var(--color-gain);
        }
        .loss {
          color: var(--color-loss);
        }
      `}</style>
    </span>
  );
};

const Results = ({ t1, t2, price1, price2, price1After, price2After }) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const timer = useRef();

  // 1 token1 = k token2
  const k = bn(price1).div(price2);

  // x * y = k;
  // x * price1After = y * price2After;
  // Solve x and y
  const x = k.times(price2After).div(price1After).sqrt();
  const y = k.div(x);

  const valueOrigin = bn(price1).times(2);
  const valueHold = bn(price1After).plus(k.times(price2After));
  const valueHoldToken1 = bn(price1After).times(2);
  const valueHoldToken2 = k.times(price2After).times(2);
  const valuePool = x.times(price1After).plus(y.times(price2After));

  const pyPool = valuePool.minus(valueOrigin).div(valueOrigin).times(100); // percent yield if pool
  const pyHold = valueHold.minus(valueOrigin).div(valueOrigin).times(100); // percent yield if hold both token
  const pyHoldToken1 = valueHoldToken1
    .minus(valueOrigin)
    .div(valueOrigin)
    .times(100); // percent yeild if hold token1
  const pyHoldToken2 = valueHoldToken2
    .minus(valueOrigin)
    .div(valueOrigin)
    .times(100); // percent yeild if hold token2

  const il = valueHold.minus(valuePool).div(valueHold).times(100);

  const copy = () => {
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 3000);

    /*
    router.replace({
      query: {
        t: `${t1},${t2}`,
        p: `${price1},${price2}`,
        pa: `${price1After},${price2After}`,
      },
    });
    */

    const target = document.getElementById(copyInputId);
    const queryString = `t=${t1},${t2}&p=${price1},${price2}&pa=${price1After},${price2After}`;
    target.value = `${window.location.origin}?${queryString}`;
    target.select();
    document.execCommand("copy");
  };

  return (
    <Block title="損失計算結果">
      <input className="hide-input" id={copyInputId} />
      <Button variant="outlined" color="primary" onClick={copy}>
        {copied ? "複製成功👍" : "複製計算結果網址"}
      </Button>
      <div className="title">無常損失：{il.toFixed()}%</div>

      <div className='title'>份額變化:</div>
      <p>入池份額：1 {t1} ＋ {k.toFixed()} {t2}</p>
      <p>贖回份額：{x.toFixed()} {t1} ＋ {y.toFixed()} {t2}</p>

      <p className="title">
        如果你原本打算同時持有{t1}和{t2}，<br />
        參與流動性挖礦會讓你{renderTerm(pyHold, pyPool)}
      </p>
      <p>維持原本配置的收益率會是：{renderPy(pyHold)}</p>
      <p>參與挖礦後贖回的收益率是：{renderPy(pyPool)}</p>

      <p className="title">
        如果你原本打算全部持有{t1}， <br />
        參與流動性挖礦會讓你{renderTerm(pyHoldToken1, pyPool)}
      </p>
      <p>維持原本配置的收益率會是：{renderPy(pyHoldToken1)}</p>
      <p>參與挖礦後贖回的收益率是：{renderPy(pyPool)}</p>

      <p className="title">
        如果你原本打算全部持有{t2}，<br />
        參與流動性挖礦會讓你{renderTerm(pyHoldToken2, pyPool)}
      </p>
      <p>維持原本配置的收益率會是：{renderPy(pyHoldToken2)}</p>
      <p>參與挖礦後贖回的收益率是：{renderPy(pyPool)}</p>

      <style jsx>{`
        .title {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 24px 0 0 0;
        }
        .hide-input {
          position: fixed;
          width: 10px;
          left: -20px;
        }
      `}</style>
    </Block>
  );
};

export default Results;
