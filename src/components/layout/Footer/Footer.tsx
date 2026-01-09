import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import schoolLogo from "@/assets/school-logo.svg";
import Button from "@/components/common/Button/Button";
import Link from "@/components/common/Link/Link";
import style from "./Footer.module.css";

interface ComponentProps {
  className?: string;
}

const Footer = ({ className, ...props }: ComponentProps) => {
  const navigate = useNavigate();

  return (
    <footer className={clsx(style.footer, className)} {...props}>
      <div className={style.footerContainer}>
        <div className={style.mainContainer}>
          <div className={style.titlelogoContainer}>
            <Button
              variant="secondary"
              className={style.logoContainerButton}
              onClick={() => {
                void navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img className={style.schoolLogo} src={schoolLogo} alt="school-logo" />
            </Button>

            <div className={style.titleContainer}>
              <h1 className={style.title}>ACD Research Repository</h1>
              <p className={style.schoolName}>Assumption College of Davao</p>

              <p className={style.desktopDescription}>
                The official research repository of Assumption College of Davao, providing access to
                academic research and scholarly work.
              </p>
            </div>
          </div>

          <p className={style.mobileDescription}>
            The official research repository of Assumption College of Davao, providing access to
            academic research and scholarly work.
          </p>

          <div className={style.linkcontactContainer}>
            <div className={style.linksContainer}>
              <h3 className={style.linkText}>Links</h3>
              <Link href="https://www.facebook.com/assumptiondavao.edu.ph">Facebook</Link>
              <Link href="https://github.com/r4ppz19/research-repository">Github</Link>
              <Link href="https://github.com/r4ppz/research-repo-docs">About</Link>
            </div>

            <div className={style.contactContainer}>
              <h3 className={style.contactText}>Contact</h3>
              <Link
                onClick={() => {
                  alert(`idk what to put in here...`);
                }}
              >
                research@acd.edu.ph
              </Link>
              <Link
                onClick={() => {
                  alert(":P");
                }}
              >
                +63 82 123 4567
              </Link>
              <Link
                href={
                  "https://www.google.com/maps/place/Assumption+College+of+Davao/@7.0878009,125.6237942,19.61z/data=!4m6!3m5!1s0x32f9115554d3f877:0x88ff74ef25a00438!8m2!3d7.087841!4d125.6238969!16s%2Fm%2F04657vd?entry=ttu&g_ep=EgoyMDI1MTAwNC4wIKXMDSoASAFQAw%3D%3D"
                }
              >
                Cabaguio Avenue, Davao City
              </Link>
            </div>
          </div>
        </div>
        <h4 className={style.copyrightNotice}>
          &copy; {new Date().getFullYear()} Assumption College of Davao. All rights reserved.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
