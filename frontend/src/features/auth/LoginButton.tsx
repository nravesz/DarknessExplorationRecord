import Button from '../common/Button';

const LoginButtonContainer = () => {
  const handleClick = () => {
    alert('Click!');
  };

  return <Button label="Login" onClick={handleClick} />;
};

export default LoginButtonContainer;
