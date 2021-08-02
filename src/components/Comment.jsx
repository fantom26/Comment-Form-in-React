const Comment = (props) => {

    function convertDate(date) {
        let convertedDate = new Date(date);
        let year = convertedDate.getFullYear();
        let month = convertedDate.getMonth();
        let day = convertedDate.getDate();


        if (month === 0) {
            month = 'January';
        } else if (month === 1) {
            month = 'February';
        } else if (month === 2) {
            month = 'March';
        } else if (month === 3) {
            month = 'April';
        } else if (month === 4) {
            month = 'May';
        } else if (month === 5) {
            month = 'June';
        } else if (month === 6) {
            month = 'July';
        } else if (month === 7) {
            month = 'August';
        } else if (month === 8) {
            month = 'September';
        } else if (month === 9) {
            month = 'October';
        } else if (month === 10) {
            month = 'November';
        } else if (month === 11) {
            month = 'December';
        }

        return month + " " + day + ", " + year;
    }

    return (
        <div className="card w-50 m-auto mt-3 bg-dark text-white">
            <div className="card-header">
                <p><span className="h5">{props.name}</span> on <span
                    className="text-info">{convertDate(props.created_at)}</span></p>
            </div>
            <div className="card-body bt-5">
                <h2>Comment:</h2>
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default Comment;

