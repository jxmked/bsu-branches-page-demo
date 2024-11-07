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
  /**
   *
   * @param {FeedData} data
   */
  constructor(data) {
    /**
     * Main data
     *
     * @type {FeedData}
     */
    this.data = Object.assign({}, data);

    /**
     * Base element
     *
     * @type {HTMLDivElement}
     */
    this.base_element = document.createElement("div");

    /**
     * Available image if no campus image provided
     *
     * @type {String}
     */
    this.hero_branch_na = "no-prev.png";

    /**
     * Is Rendered?
     *
     * @type {Boolean}
     */
    this.is_rendered = false;

    /**
     * Click function if we can enlarge image
     *
     * @type {Function}
     */
    this.hero_prev_callback = function () {};

    /**
     * Automatically set image to be enlargable if the
     * preview of the campus is available
     *
     * @type {Boolean}
     */
    this.enlargable = true;
  }

  /**
   * Generate image container and place the image
   *
   */
  gc_branches_img() {
    /**
     * @type {HTMLDivElement}
     */
    const e = document.createElement("div");

    /**
     * Keeping the instance accesible
     *
     * @type {CreatePreview}
     */
    const self = this;

    /**
     * IS campus image available?
     * If does, use it instead of default "no image avalable"
     */
    if ("branch_hero" in this.data && !!this.data.branch_hero) {
      e.setAttribute(
        "style",
        `background-image: url("./assets/branches-img/${this.data.branch_hero}")`
      );

      /**
       * Also make the image enlargable
       */
      if (self.enlargable)
        e.addEventListener("click", function () {
          self.hero_prev_callback();
        });
      else e.classList.add("no-enlarge-prev");
    } else {
      e.setAttribute(
        "style",
        `background-image: url("./assets/branches-img/${this.hero_branch_na}")`
      );
      e.classList.add("no-enlarge-prev");
    }

    this.base_element.appendChild(e);
  }

  /**
   * Create the title and address of placeholder
   */
  gc_title_n_addr() {
    /**
     * @type {HTMLHeadingElement}
     */
    const title = document.createElement("h3");

    /**
     * @type {HTMLSpanElement}
     */
    const addr = document.createElement("span");

    title.classList.add("campus-q-camp");
    addr.classList.add("campus-q-caddrs");

    title.appendChild(document.createTextNode(this.data.branch_name));
    addr.appendChild(document.createTextNode(this.data.address));

    this.base_element.appendChild(title);
    this.base_element.appendChild(addr);
  }

  /**
   * Create campus description plaeholder
   */
  gc_desc() {
    /**
     * @type {HTMLParagraphElement}
     */
    const e = document.createElement("p");

    e.classList.add("campus-q-desc");

    e.appendChild(document.createTextNode(this.data.article));

    this.base_element.appendChild(e);
  }

  /**
   * Create campus available majors
   */
  gc_colg() {
    /**
     * @type {HTMLDivElement}
     */
    const base = document.createElement("div");

    /**
     * @type {HTMLLabelElement}
     */
    const label = document.createElement("label");

    /**
     * @type {HTMLUListElement}
     */
    const ul = document.createElement("ul");

    base.classList.add("campus-q-colg");
    label.setAttribute("for", "bachelors-list");
    ul.id = "bachelors-list";

    label.appendChild(document.createTextNode("Colleges"));

    (this.data.colleges || []).forEach(function (item) {
      /**
       * @type {HTMLLIElement}
       */
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(item));
      ul.appendChild(li);
    });

    base.appendChild(label);
    base.appendChild(ul);

    this.base_element.appendChild(base);
  }

  /**
   *
   * @param {String} name
   * @param {FeedData.colleges} list
   * @returns {HTMLDivElement}
   */
  #gc_sub_contacts(name, list) {
    /**
     * @type {HTMLDivElement}
     */
    const base = document.createElement("div");

    /**
     * @type {HTMLLabelElement}
     */
    const label = document.createElement("label");

    /**
     * @type {HTMLUListElement}
     */
    const ul = document.createElement("ul");

    label.appendChild(document.createTextNode(name));

    label.setAttribute("for", `contact-${name}`);
    ul.id = `contact-${name}`;

    list.forEach(function (item) {
      /**
       * @type {HTMLLIElement}
       */
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(item));
      ul.appendChild(li);
    });

    base.appendChild(label);
    base.appendChild(ul);

    return base;
  }

  /**
   * Create contacts placeholder
   */
  gc_contacts() {
    /**
     * @type {HTMLDivElement}
     */
    const base = document.createElement("div");

    /**
     * @type {HTMLDivElement}
     */
    const base_title = document.createElement("div");

    base.classList.add("campus-q-cpts");

    base_title.appendChild(document.createTextNode("Contacts"));

    /**
     *@type {Array.<String>}
     */
    const phone = [];

    /**
     *@type {Array.<String>}
     */
    const email = [];

    /**
     *@type {Boolean}
     */
    let is_contacts_avail = false;

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
      is_contacts_avail = true;
    }

    if (email.length > 0) {
      base.appendChild(this.#gc_sub_contacts("Email", email));
      is_contacts_avail = true;
    }

    if (is_contacts_avail) this.base_element.appendChild(base);
  }

  /**
   * Begin creating everything
   *
   * @returns {CreatePreview}
   */
  render() {
    if (this.is_rendered) return;
    this.is_rendered = true;

    // Order of declaration relies on execution
    this.gc_branches_img();
    this.gc_title_n_addr();
    this.gc_desc();
    this.gc_colg();
    this.gc_contacts();

    return this;
  }

  /**
   * @type {HTMLDivElement}
   */
  get element() {
    return this.base_element;
  }
}
