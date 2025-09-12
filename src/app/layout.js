import NavBar from "@components/NavBar";
// import Footer from "@components/Footer"; // 暂时注释掉
import "@styles/global.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>
        <NavBar />
        {children}
        {/* <Footer /> */} {/* 暂时注释掉 */}
      </body>
    </html>
  );
}