export default function AdminCheckpointsPage(){
 const rows=[["Team Null","24","23","Submitted"],["Aarav Sharma","24","18","Submitted"],["Pulse Makers","24","12","Partially complete"]];
 return <><p className="eyebrow">Mock checkpoints</p><h1 className="text-3xl font-semibold">Hourly checkpoint review</h1><div className="table-wrap mt-8"><table className="table"><thead><tr><th>Team</th><th>Total hours</th><th>Submitted</th><th>Status</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}>{r.map((v,i)=><td key={i} className={i===0?"text-white":""}>{v}</td>)}</tr>)}</tbody></table></div></>;
}