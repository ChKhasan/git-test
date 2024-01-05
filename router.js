// function handleRoute() {
//   const path = window.location.pathname;

//   if (path.endsWith("/page.html")) {
//     const queryParams = new URLSearchParams(window.location.search);
//     const id = queryParams.get("id");
//     showPage(id);
//   } else {
//     showHomePage();
//   }
// }

// function showHomePage() {
//   document.body.innerHTML = `
//       <h1>Home Page</h1>
//       <p>This is the home page.</p>
//       <a href="page.html?id=123">Go to Page with ID 123</a>
//     `;
// }

// function showPage(id) {
//   document.body.innerHTML = `
//       <h1>Page Details</h1>
//       <p>This is the page with ID: ${id}</p>
//       <a href="/">Go back to Home Page</a>
//     `;
// }

// Listen for navigation events
// window.addEventListener("popstate", handleRoute);

// Initial route handling
// handleRoute();

const id = document.getElementById("handle");
id.addEventListener("click", function() {
  console.log(this);
});
