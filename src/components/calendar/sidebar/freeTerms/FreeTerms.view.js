import React from "react";

const FreeTerms = ({ terms }) => {
    return (
        <div className="terms">
            <h2 className="terms__heading">Wolne terminy</h2>
            <div className="terms__content">
                {terms.map(([date, list]) => (
                    <div key={date} className="terms__day">
                        <h3 className="terms__date">{date}</h3>
                        <ul className="terms__list">
                            {list.map(({ duration, start, end }) => (
                                <li key={date + " " + start} className="term">
                                    <div className="term__timespan">
                                        {`${start} - ${end}`}
                                    </div>
                                    <div className="term__duration">
                                        {duration}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FreeTerms;