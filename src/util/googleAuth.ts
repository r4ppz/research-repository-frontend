let scriptLoaded = false;

export function loadGoogleScript(): Promise<void> {
  if (scriptLoaded) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };

    script.onerror = () => {
      reject(new Error("Failed to load Google Identity Services"));
    };

    document.head.appendChild(script);
  });
}
