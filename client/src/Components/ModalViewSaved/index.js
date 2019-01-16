import React from "react";
import { GemPaper } from "../../Components";

const ModalViewSaved = ({savedGems, removeSavedGems}) => (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {savedGems.length ? savedGems.length : ''} Saved Gems
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="modal-body">
              {savedGems.length
                ? savedGems.map((el, i) => {
                    return <GemPaper isModal="true" key={i} {...el} />;
                  })
                : "Please add a gem to view your saved gems"}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
);

export default ModalViewSaved;
