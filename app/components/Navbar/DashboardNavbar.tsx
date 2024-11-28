import { useNavigate } from "@remix-run/react";
import styles from "../../css/Navbar.module.css";

export default function DashboardNavbar({isInsurer}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  const goToInsurances = () => {
    navigate("/insurances");
  };

  const goToAbout = () => {
    navigate("/profile");
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <img
          src="/Passaro.png"
          alt="Logo"
          className={styles.logoImage}
        />
      </div>

    <div>
        <svg preserveAspectRatio="xMidYMid meet" data-bbox="0 0.848 180 64.234" xmlns="http://www.w3.org/2000/svg" viewBox="0 0.848 180 64.234" height="66" width="180" data-type="color" role="presentation" aria-hidden="true" aria-label="">
          <g>
            <path fill="#171923" d="M53.303 34.026V11.152h3.718v3.86c.69-1.381 1.647-2.432 2.87-3.154 1.224-.753 2.652-1.13 4.283-1.13 3.577 0 5.867 1.554 6.871 4.66A7.808 7.808 0 0 1 74.105 12c1.349-.847 2.902-1.27 4.659-1.27 5.082 0 7.624 3.012 7.624 9.036v14.26h-3.812V19.954c0-2.102-.377-3.64-1.13-4.612-.721-1.004-1.93-1.506-3.624-1.506-1.85 0-3.325.659-4.424 1.976-1.098 1.318-1.647 3.075-1.647 5.271v12.943H67.94V19.954c0-2.102-.376-3.64-1.13-4.612-.72-1.004-1.929-1.506-3.623-1.506-1.883 0-3.373.659-4.47 1.976-1.068 1.318-1.601 3.075-1.601 5.271v12.943h-3.812Z" data-color="1"></path>
            <path fill="#171923" d="M38.106 34.45c-3.608 0-6.463-1.052-8.565-3.154-2.102-2.134-3.153-5.02-3.153-8.66 0-2.353.47-4.423 1.412-6.212.941-1.82 2.227-3.216 3.859-4.188 1.663-1.004 3.577-1.506 5.741-1.506 3.107 0 5.538 1.004 7.295 3.012 1.757 1.976 2.636 4.706 2.636 8.188v1.46H30.106c.125 2.604.878 4.596 2.259 5.976 1.38 1.35 3.294 2.024 5.741 2.024 1.38 0 2.699-.204 3.954-.612 1.255-.439 2.447-1.145 3.576-2.118l1.318 2.683c-1.035.973-2.353 1.741-3.953 2.306-1.6.533-3.232.8-4.895.8Zm-.611-20.897c-2.165 0-3.875.675-5.13 2.024-1.255 1.35-1.993 3.122-2.212 5.318h13.883c-.094-2.322-.706-4.126-1.835-5.412-1.098-1.286-2.667-1.93-4.706-1.93Z" data-color="1"></path>
            <path fill="#171923" d="M11.577 34.45c-1.82 0-3.42-.409-4.8-1.225a7.867 7.867 0 0 1-3.06-3.34v4.14H0V.848h3.812v14.26c.659-1.35 1.679-2.416 3.06-3.2 1.38-.785 2.948-1.177 4.705-1.177 2.04 0 3.812.486 5.318 1.459 1.538.94 2.714 2.306 3.53 4.094.847 1.757 1.27 3.86 1.27 6.306 0 2.416-.423 4.518-1.27 6.307-.816 1.757-1.992 3.121-3.53 4.094-1.506.973-3.278 1.46-5.318 1.46Zm-.8-3.06c2.134 0 3.844-.753 5.13-2.259 1.286-1.537 1.93-3.718 1.93-6.542 0-2.855-.644-5.035-1.93-6.541-1.286-1.506-2.996-2.26-5.13-2.26-2.133 0-3.843.754-5.13 2.26-1.286 1.506-1.93 3.686-1.93 6.541 0 2.824.644 5.005 1.93 6.542 1.287 1.506 2.997 2.26 5.13 2.26Z" data-color="1"></path>
            <path fill="#171923" d="M128.846 34.449c-3.608 0-6.463-1.051-8.565-3.153-2.102-2.134-3.153-5.02-3.153-8.66 0-2.353.47-4.424 1.412-6.212.941-1.82 2.227-3.216 3.859-4.188 1.663-1.005 3.577-1.507 5.741-1.507 3.107 0 5.538 1.005 7.295 3.013 1.757 1.976 2.636 4.706 2.636 8.188v1.46h-17.225c.125 2.603.878 4.596 2.259 5.976 1.38 1.35 3.294 2.024 5.741 2.024 1.381 0 2.699-.204 3.954-.612 1.255-.44 2.447-1.145 3.576-2.118l1.318 2.683c-1.035.972-2.353 1.741-3.953 2.306-1.6.533-3.232.8-4.895.8Zm-.611-20.896c-2.165 0-3.875.675-5.13 2.024s-1.993 3.122-2.212 5.318h13.883c-.094-2.322-.706-4.126-1.835-5.412-1.098-1.287-2.667-1.93-4.706-1.93Z" data-color="1"></path>
            <path fill="#171923" d="M111.132 34.448c-2.699 0-4.722-.706-6.071-2.118-1.349-1.443-2.024-3.514-2.024-6.212v-12h-4.47v-2.966h4.47V4.14h3.812v7.012h7.248v2.965h-7.248v11.625c0 1.788.377 3.153 1.13 4.094.753.91 1.976 1.365 3.67 1.365.502 0 1.004-.063 1.506-.188.502-.126.957-.251 1.365-.377l.659 2.918c-.408.22-1.004.424-1.788.612a9.682 9.682 0 0 1-2.259.282Z" data-color="1"></path>
            <path fill="#171923" d="M174.575 5.458V1.176h4.706v4.282h-4.706Zm.471 28.567V11.153h3.812v22.872h-3.812Z" data-color="1"></path>
            <path fill="#171923" d="m157.194 34.024-9.836-22.872h4.141l7.577 18.543 7.671-18.543h3.906l-9.883 22.872h-3.576Z" data-color="1"></path>
            <path fill="#0077FF" d="M94.132 33.377h.148a4.598 4.598 0 0 0 4.595-4.594 4.598 4.598 0 0 0-4.595-4.594h-.148a4.598 4.598 0 0 0-4.595 4.594 4.598 4.598 0 0 0 4.595 4.594Z" data-color="2"></path>
            <path fill="#0077FF" d="M144.552 33.377h.149a4.597 4.597 0 0 0 4.594-4.594 4.597 4.597 0 0 0-4.594-4.594h-.149a4.598 4.598 0 0 0-4.594 4.594 4.598 4.598 0 0 0 4.594 4.594Z" data-color="2"></path>
            <path fill="#171923" d="M175.549 60.951a8.228 8.228 0 0 1-2.478-.367c-.781-.244-1.423-.589-1.928-1.032l.597-1.308a5.65 5.65 0 0 0 1.812.986 7.178 7.178 0 0 0 2.043.299c.872 0 1.529-.16 1.973-.482.443-.321.665-.757.665-1.308 0-.428-.145-.765-.436-1.01-.29-.26-.749-.458-1.376-.596l-2.088-.459c-1.897-.413-2.846-1.392-2.846-2.937 0-1.01.398-1.82 1.194-2.432.81-.612 1.866-.918 3.166-.918a6.46 6.46 0 0 1 2.18.367c.703.23 1.285.574 1.744 1.033l-.62 1.307a4.483 4.483 0 0 0-1.56-.94 4.719 4.719 0 0 0-1.744-.344c-.857 0-1.507.168-1.95.504a1.59 1.59 0 0 0-.666 1.331c0 .857.566 1.407 1.698 1.652l2.088.436c.979.214 1.721.559 2.226 1.033.505.459.757 1.086.757 1.881 0 1.025-.405 1.836-1.216 2.433-.811.58-1.889.871-3.235.871Z" data-color="1"></path>
            <path fill="#171923" d="M163.972 60.951c-1.086 0-2.027-.237-2.822-.71a4.883 4.883 0 0 1-1.859-1.997c-.428-.872-.642-1.897-.642-3.075 0-1.178.214-2.195.642-3.051.444-.873 1.063-1.546 1.859-2.02.795-.474 1.736-.711 2.822-.711 1.071 0 2.004.237 2.8.711a4.662 4.662 0 0 1 1.858 2.02c.444.856.666 1.873.666 3.051 0 1.178-.222 2.203-.666 3.075a4.69 4.69 0 0 1-1.858 1.996c-.796.474-1.729.711-2.8.711Zm0-1.491c1.04 0 1.874-.367 2.501-1.101.627-.75.941-1.813.941-3.19 0-1.392-.314-2.455-.941-3.19-.627-.733-1.461-1.1-2.501-1.1-1.055 0-1.897.367-2.524 1.1-.612.735-.918 1.798-.918 3.19 0 1.377.306 2.44.918 3.19.627.734 1.469 1.101 2.524 1.101Z" data-color="1"></path>
            <path fill="#171923" d="M151.55 60.745V49.594h1.812v1.996c.597-1.346 1.821-2.088 3.672-2.226l.665-.069.138 1.606-1.171.138c-1.055.092-1.858.428-2.409 1.01-.551.566-.826 1.346-.826 2.34v6.356h-1.881Z" data-color="1"></path>
            <path fill="#171923" d="M142.937 60.952c-2.677 0-4.016-1.477-4.016-4.429v-6.93h1.859V56.5c0 .994.199 1.729.597 2.203.413.474 1.055.711 1.927.711.948 0 1.721-.314 2.317-.94.597-.643.895-1.492.895-2.548v-6.333h1.859v11.152h-1.813v-1.882a3.766 3.766 0 0 1-1.491 1.56c-.627.352-1.339.529-2.134.529Z" data-color="1"></path>
            <path fill="#171923" d="M130.781 65.082c-.964 0-1.874-.13-2.731-.39a6.744 6.744 0 0 1-2.248-1.125l.619-1.354c.688.49 1.369.842 2.042 1.056.689.214 1.43.321 2.226.321 2.203 0 3.304-1.132 3.304-3.396v-1.973a3.724 3.724 0 0 1-1.514 1.675c-.673.398-1.446.596-2.318.596-1.025 0-1.912-.237-2.661-.71a4.788 4.788 0 0 1-1.744-1.951c-.398-.842-.597-1.813-.597-2.914 0-1.102.199-2.065.597-2.891.413-.842.994-1.492 1.744-1.95.749-.46 1.636-.689 2.661-.689.872 0 1.645.199 2.318.596a3.62 3.62 0 0 1 1.514 1.63v-2.02h1.813v10.349c0 1.713-.429 2.998-1.285 3.855-.842.856-2.088 1.285-3.74 1.285Zm-.276-6.104c1.071 0 1.92-.367 2.547-1.101.627-.735.941-1.721.941-2.96 0-1.24-.314-2.218-.941-2.937-.627-.734-1.476-1.102-2.547-1.102-1.055 0-1.896.367-2.524 1.102-.627.719-.94 1.698-.94 2.937 0 1.239.313 2.225.94 2.96.628.734 1.469 1.101 2.524 1.101Z" data-color="1"></path>
            <path fill="#171923" d="M118.962 60.951c-1.759 0-3.151-.512-4.176-1.537-1.025-1.04-1.537-2.447-1.537-4.222 0-1.147.229-2.157.688-3.029.459-.887 1.086-1.568 1.882-2.042.81-.49 1.744-.734 2.799-.734 1.514 0 2.7.49 3.557 1.468.856.964 1.285 2.295 1.285 3.993v.711h-8.398c.061 1.27.428 2.241 1.101 2.914.673.658 1.606.987 2.799.987.673 0 1.316-.1 1.928-.298a5.4 5.4 0 0 0 1.743-1.033l.643 1.308c-.505.474-1.147.849-1.927 1.124-.781.26-1.576.39-2.387.39Zm-.298-10.187c-1.056 0-1.889.329-2.501.986-.612.658-.971 1.522-1.079 2.593h6.769c-.046-1.132-.344-2.011-.895-2.639-.535-.627-1.3-.94-2.294-.94Z" data-color="1"></path>
            <path fill="#171923" d="M106.955 60.951a8.228 8.228 0 0 1-2.478-.367c-.78-.244-1.423-.589-1.927-1.032l.596-1.308a5.666 5.666 0 0 0 1.813.986 7.171 7.171 0 0 0 2.042.299c.872 0 1.53-.16 1.973-.482a1.53 1.53 0 0 0 .666-1.308c0-.428-.146-.765-.436-1.01-.291-.26-.75-.458-1.377-.596l-2.088-.459c-1.897-.413-2.845-1.392-2.845-2.937 0-1.01.397-1.82 1.193-2.432.811-.612 1.866-.918 3.166-.918a6.45 6.45 0 0 1 2.18.367c.704.23 1.285.574 1.744 1.033l-.62 1.307a4.474 4.474 0 0 0-1.56-.94 4.715 4.715 0 0 0-1.744-.344c-.856 0-1.506.168-1.95.504a1.59 1.59 0 0 0-.665 1.331c0 .857.566 1.407 1.698 1.652l2.088.436c.979.214 1.72.559 2.225 1.033.505.459.757 1.086.757 1.881 0 1.025-.405 1.836-1.216 2.433-.81.58-1.889.871-3.235.871Z" data-color="1"></path>
          </g>
        </svg>
    </div>


      <div className={styles.buttons}>
        <button className={styles.button} onClick={goToDashboard}>Dashboard</button>
        {isInsurer && (
          <button onClick={goToInsurances} className={styles.button}>
            Insurances
          </button>
        )}
        <button className={styles.buttonLogout} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
