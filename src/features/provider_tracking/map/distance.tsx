import { IconCar } from '@tabler/icons'
import { Button } from 'react-bootstrap'

const litresPerKM = 1 / 10
const gasLitreCost = 35
const litreCostKM = litresPerKM * gasLitreCost

type DistanceProps = {
  leg: google.maps.DirectionsLeg
  booking: any
}
function Distance({ leg, booking }: DistanceProps) {
  // console.log('leg..', leg)
  if (!leg.distance || !leg.duration) return null

  const cost = Math.floor((leg.distance.value / 1000) * litreCostKM)

  return (
    <div className="px-2 mt-4">
      <p>
        Estimated Time: <span className="fw-bold">{leg.duration.text}</span>
      </p>

      <p>
        Distance: <span className="fw-bold">{leg.distance.text}</span>
      </p>
      <p>
        Cost:{' '}
        <span className="fw-bold">
          {cost} {'  BIRR'}
        </span>
        .
      </p>
      <Button onClick={booking} className="bottom-0 ">
        Book
      </Button>
    </div>
  )
}
export default Distance
