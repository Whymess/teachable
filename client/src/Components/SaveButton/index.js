import React from "react";

const SaveButton = ({saved, saveGem, removeSavedGem, gem}) => (
 <button onClick={() => {saved ? removeSavedGem(gem.sha) : saveGem(gem)} }> {saved ? 'unSave' : 'Save'} </button>
);

export default SaveButton;
