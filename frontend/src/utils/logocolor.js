const colors = ["blue", "mustard", "red", "green", "grey"];
const randomColor = (id) => colors[id % 5];
export default randomColor;