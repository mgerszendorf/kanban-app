import BeatLoader from "react-spinners/BeatLoader";

interface ILoaderProps {
  left?: string;
}

const Loader = (props: ILoaderProps) => (
  <div className="loader" style={{ left: props.left }}>
    <BeatLoader color="#ff3572" size={10} />
  </div>
);

export default Loader;
