(function (w, feed_url) {
  async function load_feed(feed_url) {
    const res = await fetch(`./${feed_url}`, {
      method: "GET",
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("Unable to read feed right now. :(");
  }

  function create_campus_item(feed_data_item, click_callback) {
    const li = document.createElement("li");
    const h5 = document.createElement("h5");
    const p = document.createElement("p");

    h5.innerText = feed_data_item.branch_name;
    p.innerText = feed_data_item.address;

    li.appendChild(h5);
    li.appendChild(p);

    li.addEventListener("click", click_callback);
    li.classList.add("on-animate");

    return li;
  }





  w.addEventListener("DOMContentLoaded", async function () {
    const feed_data = await load_feed(feed_url);

    let index = 0;

    const list_items = [];

    let ival = setInterval(function () {
      if (index >= feed_data.length) {
        clearInterval(ival);
        return;
      }

      const data = feed_data[index];
      const item = create_campus_item(data);
      list_items.push(item);

      setTimeout(() => {
        item.classList.add("visible-now");

        // Set the click event if we can see it...
        item.addEventListener("click", function () {
          // Skip already selected
          if (item.classList.contains("selected")) return;

          // Reset all
          list_items.forEach((i) => i.classList.remove("selected"));
          item.classList.add("selected");
        });
      }, 200);

      document.querySelector("#campus-list-selection").appendChild(item);

      index++;
    }, 100);
  });
})(window, "feed.json");
