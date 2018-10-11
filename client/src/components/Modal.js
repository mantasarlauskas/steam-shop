import React from 'react';

export default ({ title, text, onSubmit }) => (
  <div className="modal fade" id="modalWindow">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{ title }</h5>
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">{ text }</div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" onClick={onSubmit} data-dismiss="modal">Patvirtinti</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Atšaukti</button>
        </div>
      </div>
    </div>
  </div>
);