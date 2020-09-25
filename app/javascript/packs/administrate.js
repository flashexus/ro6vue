require("@rails/ujs").start()
require("turbolinks").start()

// The next line you only need if you want ActiveStorage support
//require("@rails/activestorage").start()

// The next line you only need if you need channels in administrate
//require("channels")

// The next two lines you only need if you want ActionText support
//require("trix")
//require("@rails/actiontext")

require("../administrate/index")

import 'bootstrap';
import '../stylesheets/application';