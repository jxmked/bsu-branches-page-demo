/* <div>
<!-- Campus main image -->
<div style="background-image: url(./assets/branches-img/Alangilan.jpg)"></div>

<h3 class="campus-q-camp">Pablo Borbon Campus</h3>
<span class="campus-q-caddrs">Golden Country Homes, Brgy. Alangilan, Batangas City</span>

<p class="campus-q-desc">
  Located at Rizal Avenue, Batangas City, Pablo Borbon is the oldest and main
  campus of the university and serves as the seat of the administration of the
  institution. It spans 5.96 hectares and provides excellent proximity to
  Batangas International Port and the Southern Tagalog Arterial Road (STAR).
</p>

<div class="campus-q-colg">
  <label for="bachelors-list"> Colleges </label>
  <ul id="bachelors-list">
    <li>
      College of Accountancy, Business, Economics, and International Hospitality
      Management
    </li>
    <li>College of Arts and Sciences</li>
    <li>College of Law</li>
    <li>College of Nursing and Allied Health Sciences</li>
    <li>College of Teacher Education</li>
  </ul>
</div>

<div class="campus-q-cpts">
  <div>Contacts</div>

  <div>
    <label for="contact-phones">Phones</label>
    <ul id="contact-phones">
      <li>425-0139</li>
      <li>425-0143</li>
    </ul>
  </div>

  <div>
    <label for="contact-email">Email</label>
    <ul id="contact-email">
      <li>bids.awards.nasugbu@g.batstate-u.edu.ph</li>
      <li>bids.awards.nasugbu@g.batstate-u.edu.ph</li>
    </ul>
  </div>
</div>
</div> */

// {
//   "branch_name": "Pablo Borbon Campus",
//   "article": "Located at Rizal Avenue, Batangas City, Pablo Borbon is the oldest and main campus of the university and serves as the seat of the administration of the institution. It spans 5.96 hectares and provides excellent proximity to Batangas International Port and the Southern Tagalog Arterial Road (STAR).",
//   "contacts": [
//     { "type": "phone", "value": "779-8400" },
//     { "type": "phone", "value": "406-8800" }
//   ],
//   "colleges": [
//     "College of Accountancy, Business, Economics, and International Hospitality Management",
//     "College of Arts and Sciences",
//     "College of Law",
//     "College of Nursing and Allied Health Sciences",
//     "College of Teacher Education"
//   ],
//   "address": "Rizal Avenue, Batangas City"
// }

// prefix "gc" means Generate Container

class CreatePreview {
  constructor(data) {
    this.data = Object.assign({}, data);
    this.base_element = document.createElement("div");
    this.hero_branch_na = "no-prev.png";
    this.is_rendered = false;
  }

  gc_branches_img() {
    const e = document.createElement("div");

    let hero = this.hero_branch_na;

    if ("branch_hero" in this.data && !!this.data.branch_hero) {
      hero = this.data.branch_hero;
    }

    e.setAttribute("style", `background-image: url("./assets/branches-img/${hero}")`);
    e.classList.add("no-enlarge-prev");

    this.base_element.appendChild(e);
  }

  gc_title_n_addr() {
    const title = document.createElement("h3");
    const addr = document.createElement("span");

    title.classList.add("campus-q-camp");
    addr.classList.add("campus-q-caddrs");

    title.appendChild(document.createTextNode(this.data.branch_name));
    addr.appendChild(document.createTextNode(this.data.address));

    this.base_element.appendChild(title);
    this.base_element.appendChild(addr);
  }

  gc_desc() {
    const e = document.createElement("p");

    e.classList.add("campus-q-desc");

    e.appendChild(document.createTextNode(this.data.article));

    this.base_element.appendChild(e);
  }

  gc_colg() {
    const base = document.createElement("div");
    const label = document.createElement("label");
    const ul = document.createElement("ul");

    base.classList.add("campus-q-colg");
    label.setAttribute("for", "bachelors-list");
    ul.id = "bachelors-list";

    label.appendChild(document.createTextNode("Colleges"));

    (this.data.colleges || []).forEach(function (item) {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(item));
      ul.appendChild(li);
    });

    base.appendChild(label);
    base.appendChild(ul);

    this.base_element.appendChild(base);
  }

  #gc_sub_contacts(name, list) {
    const base = document.createElement("div");
    const label = document.createElement("label");
    const ul = document.createElement("ul");

    label.appendChild(document.createTextNode(name));

    label.setAttribute("for", `contact-${name}`);
    ul.id = `contact-${name}`;

    list.forEach(function (item) {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(item));
      ul.appendChild(li);
    });

    base.appendChild(label);
    base.appendChild(ul);

    return base;
  }

  gc_contacts() {
    const base = document.createElement("div");
    const base_title = document.createElement("div");

    base.classList.add("campus-q-cpts");

    base_title.appendChild(document.createTextNode("Contacts"));

    const phone = [];
    const email = [];

    (this.data.contacts || []).forEach(function (item) {
      if (item.type.toLowerCase() === "phone") {
        phone.push(item.value);
        return;
      }
      if (item.type.toLowerCase() === "email") {
        email.push(item.value);
        return;
      }
    });

    base.appendChild(base_title);

    if (phone.length > 0) {
      base.appendChild(this.#gc_sub_contacts("Phones", phone));
    }

    if (email.length > 0) {
      base.appendChild(this.#gc_sub_contacts("Email", email));
    }

    this.base_element.appendChild(base);
  }

  render() {
    if (this.is_rendered) return;
    this.is_rendered = true;

    // Order of declaration relies on execution
    this.gc_branches_img();
    this.gc_title_n_addr();
    this.gc_desc();
    this.gc_colg();
    this.gc_contacts();
  }

  element() {
    return this.base_element;
  }
}
