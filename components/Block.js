const Block = ({ title, children }) => (
  <div>
    <h2>{title}：</h2>
    <div className="content">{children}</div>
    <style jsx>{`
      h2 {
        font-size: 1.8rem;
        margin: 40px 0 8px 0;
      }
      .content {
        padding-left: 24px;
      }
    `}</style>
  </div>
);

export default Block;
