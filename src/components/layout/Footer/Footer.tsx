import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Footer.module.css";
import schoolLogo from "@/assets/school-logo.svg";
import { Button } from "@/components/common/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/common/Dialog/Dialog";
import { Link } from "@/components/common/Link/Link";

interface ComponentProps {
  className?: string;
}

export const Footer = ({ className, ...props }: ComponentProps) => {
  const [openEmail, setOpenEmail] = useState(false);
  const [openPhone, setOpenPhone] = useState(false);

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
              <Link href="https://github.com/r4ppz/research-repository">Github</Link>
              <Link href="https://r4ppz.github.io/research-repo-docs/">Docs</Link>
            </div>

            <div className={style.contactContainer}>
              <h3 className={style.contactText}>Contact</h3>

              {/* WARN: Temporary modal */}
              <Dialog open={openEmail} onOpenChange={setOpenEmail}>
                <DialogTrigger asChild>
                  <Link>research@acd.edu.ph</Link>
                </DialogTrigger>
                <DialogContent>
                  <DialogDescription
                    style={{
                      padding: "20px",
                    }}
                  >
                    You found a link to nowhere. Sometimes, that's progress.
                  </DialogDescription>
                </DialogContent>
              </Dialog>

              <Dialog open={openPhone} onOpenChange={setOpenPhone}>
                <DialogTrigger asChild>
                  <Link>+63 82 123 4567</Link>
                </DialogTrigger>
                <DialogContent>
                  <DialogDescription
                    style={{
                      padding: "20px",
                    }}
                  >
                    This link is waiting for purpose. Are you?
                  </DialogDescription>
                </DialogContent>
              </Dialog>

              <Link href={"https://maps.app.goo.gl/3UeRN9nsPBYVUYyLA"}>
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
