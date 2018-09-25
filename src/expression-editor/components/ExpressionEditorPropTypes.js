import PropTypes from 'prop-types';

const ExpressionEditorPropTypes = {
  term: PropTypes.shape({
    id: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,
    next: PropTypes.arrayOf(PropTypes.shape(() => ExpressionEditorPropTypes.term)),
    parent: PropTypes.shape(() => ExpressionEditorPropTypes.term)
  }).isRequired,

  flags: PropTypes.shape({
    isEditing: PropTypes.bool,
    isSelected: PropTypes.bool,
  }).isRequired,

  expression: PropTypes.arrayOf(PropTypes.shape({
    term: (() => ExpressionEditorPropTypes.term),
    flags: (() => ExpressionEditorPropTypes.flags)
  })).isRequired,



  option: PropTypes.shape({
    id: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })
};

export default ExpressionEditorPropTypes;
