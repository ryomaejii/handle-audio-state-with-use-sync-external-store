import { AudioManagerProvider } from "./contexts/AudioManager";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AudioManagerProvider>{children}</AudioManagerProvider>
      </body>
    </html>
  );
}
