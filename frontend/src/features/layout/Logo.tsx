import logo from '../../assets/Baekilmong_Logo.png';

function Logo() {
  return (
    <div className="flex flex-col items-center w-full">
      <img src={logo} className="w-20 h-20" />
      <span className="text-sm font-semibold tracking-wide text-center">
        Darkness Exploration Records
      </span>
    </div>
  );
}

export default Logo;
