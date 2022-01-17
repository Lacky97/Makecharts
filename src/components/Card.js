import { Link } from "react-router-dom";

const Card = (props) => {
  console.log(props.item)
  return (
    <Link to={`/chart?type=${props.item.name}`} key={props.index}>
      <div
        className="items-center p-6 transition duration-500 transform bg-white border-2 rounded-lg shadow-lg hover:scale-110 hover:shadow-2xl"
        style={{ borderColor: props.item.color }}
      >
        <div className="flex items-center justify-center p-5 scale-125">
          <props.item.Icon size={64} />
        </div>
        <div className="flex items-center justify-center text-2xl font-bold">
          {props.item.name}
        </div>
      </div>
    </Link>
  );
};

export default Card;
