import createReactClass from 'create-react-class';
import Common from './Common';
import './style/index';

const TagSelect = createReactClass({
  mixins: [Common],
  getInitialState() {
    const { limit, limitedDisable } = this.props;
    const { tagList, selected } = this.getState();
    return {
      tagList,
      selected,
      disableAll: limitedDisable && selected.length >= limit,
    };
  },
});

TagSelect.RadioSelect = createReactClass({
  mixins: [Common],
  getInitialState() {
    const { tagList, selected } = this.getState();
    return {
      tagList,
      selected,
      radioMode: true,
    };
  },
});

export default TagSelect;
