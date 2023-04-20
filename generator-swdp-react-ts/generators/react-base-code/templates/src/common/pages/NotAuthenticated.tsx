const NotAuthenticated = () => {
  return (
    <main>
      <section>
        <h3>401 Hold Up!</h3>
        <h3>
          You are not authenticated to view this page
        </h3>
        <h3>
          Sorry about that! Please login to access RapidX!
        </h3>
        <div>
          <a href='/'>
            Go to home
          </a>
        </div>
      </section>
    </main>
  );
}

export default NotAuthenticated;
