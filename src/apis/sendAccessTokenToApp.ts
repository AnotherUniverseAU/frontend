export default async function sendAccessTokenToApp() {
  // React Native의 WebView로 권한 요청 메시지 전송
  if ((window as any).ReactNativeWebView) {
    await (window as any).ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "ACCESS_TOKEN",
      })
    );
  }
}
