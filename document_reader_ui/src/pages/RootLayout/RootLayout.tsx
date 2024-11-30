import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RootLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/document-reader");
  }, []);
  return <div>RootLayout</div>;
};

export default RootLayout;
