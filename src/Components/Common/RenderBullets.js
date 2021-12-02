export default function RenderBullets() {
    return (
        <span style={{ fontSize: '20px' }}>
            {Array.from(Array(16).keys()).map((_, index) => (
                <span key={index}>&#8226;</span>
            ))}
        </span>
    )
}
