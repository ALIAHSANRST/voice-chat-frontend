import { COMMON_ASSETS } from "@/src/utils/assets";

const SideCard = () => {
  return (
    <div style={{
      padding: '2rem',
      height: '100%',
    }}>
      <div style={{
        borderRadius: '1.5rem',
        width: '100%',
        background: 'linear-gradient(180deg, rgba(151, 193, 252, 0.05) 0%, rgba(151, 193, 252, 0.07) 57.44%, rgba(151, 193, 252, 0.11) 100%)',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <img
          src={COMMON_ASSETS.AUTH.PERSON_SPEAK_ARTIFACT_ICON}
          alt="person speak artifact"
          style={{
            opacity: 0.5,
            position: 'absolute',
            bottom: '0rem',
            left: 0,
          }}
        />
        <img
          src={COMMON_ASSETS.AUTH.GLOBE_ARTIFACT_ICON}
          alt="globe artifact"
          style={{
            opacity: 0.5,
            position: 'absolute',
            top: '0rem',
            right: '0rem',
          }}
        />
        <img
          src={COMMON_ASSETS.WIDE_LOGO}
          alt="globalie wide logo"
          style={{
            width: '47.5%',
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: '-2rem',
          right: '-1.125rem',
          backgroundColor: '#0064FF',
          borderRadius: '50%',
          width: '5.875rem',
          height: '5.875rem',
        }}></div>
      </div>
    </div>
  )
};

export default SideCard;