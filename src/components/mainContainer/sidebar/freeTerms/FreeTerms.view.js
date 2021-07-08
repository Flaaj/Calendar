import React from "react";
// styles:
import "./_freeTerms.scss";

const FreeTerms = ({ terms, termDblClick }) => {
    return (
        <div className="terms">
            <h2 className="terms__heading">Wolne terminy</h2>
            <div className="terms__content">
                {terms.map(([date, list]) => (
                    <div key={date} className="terms__day">
                        <h3 className="terms__date">{date.split(".").slice(0, 2).join(".")}</h3>
                        <ul className="terms__list">
                            {list.map(({ duration, start, end, startIndex, endIndex }) => (
                                <li
                                    key={date + " " + start}
                                    className="term"
                                    onDoubleClick={() => termDblClick(startIndex, endIndex, date)}
                                    onTouchStart={() => termDblClick(startIndex, endIndex, date)}
                                    title="Kliknij dwa razy aby uwtorzyć rezerwację w tym terminie"
                                >
                                    <div className="term__timespan">{`${start} - ${end}`}</div>
                                    <div className="term__duration">{duration}</div>
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
