import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import "../styles/Auth.css";

const cookies = new Cookies();

export default function Auth(props) {
    const { setIsAuth } = props;

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch (err) {
            console.error(err);
        }

    };

    return (
        <div className="auth">
            <p>Sign in with Google</p>
            <button onClick={signInWithGoogle}>Sign In</button>
        </div>
    )
}