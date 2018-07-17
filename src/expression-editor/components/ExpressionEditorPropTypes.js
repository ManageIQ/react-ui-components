import PropTypes from 'prop-types';

const ExpressionEditorPropTypes = {
  term: PropTypes.shape({
    id: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,
    next: PropTypes.arrayOf(PropTypes.shape(() => ExpressionEditorPropTypes.term)),
    parent: PropTypes.shape(() => ExpressionEditorPropTypes.term)
  }),

  expression: PropTypes.arrayOf(PropTypes.shape(() => ExpressionEditorPropTypes.term)),

  option: PropTypes.shape({
    id: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })
};

export default ExpressionEditorPropTypes;
