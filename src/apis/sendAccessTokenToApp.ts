export default async function sendAccessTokenToApp(accessToken: string) {
    if ((window as any).ReactNativeWebView) {
        await (window as any).ReactNativeWebView.postMessage(
            JSON.stringify({
                type: 'ACCESS_TOKEN',
                ACCESS_TOKEN: accessToken,
            })
        );
    }
}
