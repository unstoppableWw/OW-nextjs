import './subtitle.scss';

export default function SubTitle({ title, desc }){
    return(
            <div className="subtitle">
                <div className="subtitle_title">{title}</div>
                <div className="subtitle_desc">{desc}</div>
            </div>
    )
} 