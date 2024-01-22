// css
import "./LoginPage.scss";

// other imports
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

// store imports
import { useDispatch } from "react-redux";
import { validateTokenAction } from "../../store/actions/authActions";

// Media
import Logo from "../../assets/coriolis_logo.png";
import GoogleLogo from "../../assets/login_with_google.svg";
import LoginHomeImage from "../../assets/Login_home_Pic.png";

const TitleContainer = () => (
    <div className="left_box_wrapper">
      <div className="left_box">
        <img src={Logo} alt="" />
        <div className="ltitleBox titlebox">
          <h1 className="company_title">CTHR</h1>
          <h3 className="sub_head_desc">
            Online HrMS Platform by Coriolis Technologies
          </h3>
        </div>
      </div>
    </div>
);

const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async (codeResponse) => {
    localStorage.setItem("token", codeResponse.code);
    // console.log(codeResponse);

    try {
      dispatch(validateTokenAction());
      navigate("/");
    } catch (e) {
      // console.log(e);
    }
  };

  const handleLogin = useGoogleLogin({
    onSuccess: handleGoogleLogin,
    flow: "auth-code",
  });

  return (
    <div className="right_box_wrapper">
      <div className="right_box">
        <img className="LoginImage" src={LoginHomeImage} alt="" />
        <div className="rtitleBox titleBox">
          <h1 className="company_title">CTHR</h1>
          <h3 className="sub_head_desc">
            Online HrMS Platform by Coriolis Technologies
          </h3>
        </div>
        <button className="login_btn" onClick={handleLogin}>
          <img src={GoogleLogo} alt="LogoGoogle" />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
};

const LoginPage = () => (
    <div className="LoginPage-container">
      <TitleContainer />
      <LoginContainer />
    </div>
);

export default LoginPage;

// const navigate = useNavigate();
// const dispatch = useDispatch();
// const [isLoading, setIsLoading] = useState(false);
// const accessToken = localStorage.getItem("jwtToken");
// const isLoggedIn = localStorage.getItem("LoggedIn");
// after redux is setup grab it from redux using selector
// const redirectToHome = () => {
//   if (isLoggedIn) {
//     // replace will replace the entry of curr path in history stack
//     navigate("/", { replaceL: true });
//   }
// };

// useEffects
// check if access token exists

// useEffect(() => {
//   if (accessToken === null) {
//     setIsLoading(false);
//   }
// }, [accessToken]);

// useEffect(() => {
//   redirectToHome();
//   return () => {};
// }, [isLoggedIn]);
