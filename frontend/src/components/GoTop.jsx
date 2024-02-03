const GoTop = (props) => {
    return (
      <>
        <div className={props.showGoTop} onClick={props.scrollUp}>
          <button className="goTop">
            &#129045;
          </button>
        </div>
      </>
    );
  };

export default GoTop;
