function CatItem(props) {
    return (
      <li>
        <img src={props.img} style={{ width: "150px" }} />
      </li>
    );
}

function Favorites({ counter, favorites }) {
    // let cats = favorites.slice(counter);
  
    // if (counter === 0) {
    //   cats = favorites.slice(0, favorites.length - 1);
    // } else if (counter === favorites.length - 1) {
    //   cats = [...cats, favorites[0]];
    // } else if (favorites[counter] === undefined) {
    //   cats = favorites.slice(1);
    // }
  
    if (favorites.length === 0) {
      return <div>사진위 하트를 눌러 고양이 사진을 저장해봐요!</div>;
    }
  
    return (
      <ul className="favorites">
        {favorites.map((cat) => (
          <CatItem img={cat} key={cat} />
        ))}
      </ul>
    );
}

  export default Favorites;