import './TabBar.css';

function TabBar() {
  return (
    <div className='flex justify-center'>
      <button className="slanted-btn">Overview</button>
      <button className="slanted-btn">Description</button>
      <button className="slanted-btn">Manual</button>
      <button className="slanted-btn">Records</button>
    </div>
  );
}

export default TabBar;
