import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, useWatch } from "react-hook-form";
import bn from "bignumber.js";
import Collapse from "@material-ui/core/Collapse";
import Link from "@material-ui/core/Link";

import TextField from "@components/TextField";
import Block from "@components/Block";
import Results from "@components/Results";
import GithubIcon from "@components/GithubIcon";

bn.config({ DECIMAL_PLACES: 6 });

const rules = {
  required: "不可為空",
};

export default function App() {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const fields = useWatch({ control });

  const {
    t1,
    t2,

    price1,
    price2,

    price1After,
    price2After,
  } = fields;

  const router = useRouter();

  useEffect(() => {
    const {
      t, // token
      p, // price
      pa, //price after
    } = router.query;

    if (t) {
      const [t1, t2] = t.split(",");
      console.log(t1, t2);
      setValue("t1", t1);
      setValue("t2", t2);
    }
    if (p) {
      const [price1, price2] = p.split(",");
      setValue("price1", price1);
      setValue("price2", price2);
    }
    if (pa) {
      const [price1After, price2After] = pa.split(",");
      setValue("price1After", price1After);
      setValue("price2After", price2After);
    }
  }, [router]);

  return (
    <div className="root">
      <h1>無常損失計算機</h1>
      <p className="dev">
        {"Developed by\u00a0"}{" "}
        <Link href="https://www.facebook.com/CoinBiAi">幣癌</Link>
        <a
          className="github"
          href="https://github.com/coinbiai/il-calculator"
          aria-label="Visit Github"
        >
          <GithubIcon />
        </a>
      </p>

      <Block title="流動性挖礦幣對">
        <div className="line">
          <TextField
            {...register("t1", rules)}
            placeholder="代幣1名稱"
            error={!!errors?.t1}
            helperText={errors?.t1?.message}
          />
          {"\u00a0和\u00a0"}
          <TextField
            {...register("t2", rules)}
            placeholder="代幣2名稱"
            error={!!errors?.t2}
            helperText={errors?.t2?.message}
          />
        </div>
      </Block>

        <Block title="投入時匯率">
          <div className="line">
            {`1顆 ${t1 || "___"} ＝\u00a0`}
            <TextField
              type="number"
              {...register("price1", rules)}
              error={!!errors?.price1}
              helperText={errors?.price1?.message}
            />
            {"\u00a0美金"}
          </div>
          <div className="line">
            {`1顆 ${t2 || "___"} ＝\u00a0`}
            <TextField
              type="number"
              {...register("price2", rules)}
              error={!!errors?.price2}
              helperText={errors?.price2?.message}
            />
            {"\u00a0美金"}
          </div>
        </Block>

        <Block title="贖回時匯率">
          <div className="line">
            {`1顆 ${t1 || "___"} ＝\u00a0`}
            <TextField
              type="number"
              {...register("price1After", rules)}
              error={!!errors?.price1After}
              helperText={errors?.price1After?.message}
            />
            {"\u00a0美金"}
          </div>
          <div className="line">
            {`1顆 ${t2 || "___"} ＝\u00a0`}
            <TextField
              type="number"
              {...register("price2After", rules)}
              error={!!errors?.price2After}
              helperText={errors?.price2After?.message}
            />
            {"\u00a0美金"}
          </div>
        </Block>

      <Collapse
        in={Boolean(t1 && t2 && price1 && price2 && price1After && price2After)}
      >
        <Results {...fields} />
      </Collapse>
      <style jsx>{`
        .root {
          font-size: 14px;
          max-width: 720px;
          margin: 0 auto;
          padding: 24px 16px 64px 16px;
        }
        h1 {
          text-align: center;
        }
        .dev {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .github {
          margin: 4px 0 0 8px;
        }
        .line {
          display: flex;
          align-items: center;
        }
        .block {
          padding-left: 16px;
        }
      `}</style>
    </div>
  );
}
