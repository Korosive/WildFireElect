import React, {useState} from 'react';

function ListFeatures(props) {
	const [list, setList] = useState([]);

	function addItemtoList(e) {
		const item = e.target.value;
		console.log(item);
		setList(list => [...list, item]);
	}

	return(
		<div>
			<form>
				<div className="form-group row">
					<input type="text" />
					<input type="submit" onClick={addItemtoList} />
				</div>
			</form>
		</div>
	);
}