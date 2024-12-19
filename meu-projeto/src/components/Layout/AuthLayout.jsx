import PropTypes from 'prop-types';
function AuthLayout({ children }) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems:'center', justifyContent:'center', background:'#f5f5f5' }}>
        {children} {/* Aqui vai o componente de Login */}
      </div>
    );
  }

  AuthLayout.propTypes = {
    children: PropTypes.func.isRequired,
  };
  
  export default AuthLayout;
  