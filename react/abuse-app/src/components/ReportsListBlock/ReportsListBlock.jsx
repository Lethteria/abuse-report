function ReportsListBlock({data}){

    console.log(data);

    return (
        <ul>
            {
                data.map(report => {
                    const {id, abusedURL, email, createdAt, reportType, targetCountry} = report;

                    return (
                        <li key={id}>
                            <p>
                                <span> Url: {abusedURL} </span>
                                <span> Email: {email} </span>
                            </p>
                            <p>Created at: {createdAt}</p>
                            {(reportType || targetCountry)
                                ? <p>
                                    {reportType && <span>Report type: {reportType} </span>}
                                    {targetCountry && <span>Country: {targetCountry}</span>}
                                </p>
                                : null
                            }

                        </li>
                    )
                })
            }
        </ul>
    )
}

export default ReportsListBlock;
