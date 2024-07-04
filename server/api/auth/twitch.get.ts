export default oauth.twitchEventHandler({
  config: {
    scope: ["user:read:email"],
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        accessToken: tokens.access_token,
        image: user.profile_image_url,
        name: user.display_name,
      },
    });
    return sendRedirect(event, "/inventory");
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("Twitch OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
