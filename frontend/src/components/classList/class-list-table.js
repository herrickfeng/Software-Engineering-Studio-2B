// import * as moment from 'moment';
import * as React from 'react';

export default function ClassListTable(props) {

	return (
        //Add a class to all this
		<table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Start time</th>
                    <th>End time</th>
                    <th>Class Code</th>
                </tr>
            </thead>
            <tbody>
                {/* Insert some kind of map */}
                <tr>
                    <td>SES2A</td>
                    <td>5/10/20</td>
                    <td>1pm</td>
                    <td>3pm</td>
                    <td>40382</td>
                </tr>
            </tbody>
        </table>
	);
}