import * as reactivity from '../utils/lang/reactivity';
import * as platform from '../utils/platform';

(global => {
  class Solar {
    static utils = {
      reactivity,
      platform,
    }
  }

  global.Solar = Solar;
})(window as any);
