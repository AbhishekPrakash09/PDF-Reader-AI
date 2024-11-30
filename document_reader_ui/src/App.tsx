import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/RootLayout";
import DocumentReader from "./pages/DocumentReader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
  {
    path: "/document-reader",
    children: [
      {
        index: true,
        element: <DocumentReader />,
      },
    ],
  },
]);

function App() {
  document.title = "Geo Calc";
  return <RouterProvider router={router} />;
}

export default App;
