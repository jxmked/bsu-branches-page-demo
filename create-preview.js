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
  }

  gc_branches_img() {
    const e = document.createElement("div");

    let hero = this.hero_branch_na;

    if ("branch_hero" in this.data && !!this.data.branch_hero) {
      hero = this.data.branch_hero;
    }

    e.setAttribute("style", `background-image: url("./assets/branches-img/${hero}")`);
    this.base_element.appendChild(e);
  }

  render() {}

  element() {}
}
