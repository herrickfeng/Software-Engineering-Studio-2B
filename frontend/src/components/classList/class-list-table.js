// import * as moment from 'moment';
import * as React from 'react';
import './styles.css'

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
                    <td>SES1A</td>
                    <td>5/10/20</td>
                    <td>1pm</td>
                    <td>3pm</td>
                    <td>40382</td>
                </tr>
                <tr>
                    <td>Eng Comm</td>
                    <td>6/10/20</td>
                    <td>9am</td>
                    <td>11am</td>
                    <td>30324</td>
                </tr>
                <tr>
                    <td>MM1</td>
                    <td>6/10/20</td>
                    <td>11am</td>
                    <td>1pm</td>
                    <td>46324</td>
                </tr>
            </tbody>
        </table>
    );
}