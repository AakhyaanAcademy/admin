const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        width: "width",
      },
      boxShadow: {
        'box': '0 0 25px 2px #4f4000'
      },
      colors: {
        'background': "#080808",  //303030
        'secondBackground': "#080808",
        'tertiaryBackground': "#758781",
        'formBox': "#022621",
        'mainText': "#FFFFFF",
        'secondText': "#467fdb",
        'faintText': "#006499",
        'warningText': "#b52012",
        "testColor": "#245ee3",
        "footer": "#30278c",
        "back": "#fefeff"
      },
      keyframes: {
        loading: {
          '0%': {
            backgroundColor: 'hsl(200, 20%, 70%)'
          },
          '100%': {
            backgroundColor: 'hsl(200, 20%, 95%)'
          }
        },
        scale: {
          '0%': {
            transform: 'scale(1)'
          },
          '100%': {
            transform: 'scale(1.1)'
          },

        },
        moveLeft: {
          '0%': {
            transform: 'translateX(100%)'
          },
          '25%': {
            transform: 'translateX(75%)',
          },
          '50%': {
            transform: 'translateX(50%)'
          },
          '75%': {
            transform: 'translateX(25%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        slideLeft: {
          '0%': {
            transform: 'translateX(50%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        moveRight: {
          '0%': {
            transform: 'translateX(-100%)'
          },
          '25%': {
            transform: 'translateX(-75%)',
          },
          '50%': {
            transform: 'translateX(-50%)'
          },
          '75%': {
            transform: 'translateX(-25%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        slideRight: {
          '0%': {
            transform: 'translateX(0%)'
          },
          '100%': {
            transform: 'translateX(25%)'
          }
        },
        vanishRight: {
          '0%': {
            transform: 'translateX(0%)'
          },
          '25%': {
            transform: 'translateX(25%)',
          },
          '50%': {
            transform: 'translateX(50%)'
          },
          '75%': {
            transform: 'translateX(75%)'
          },
          '100%': {
            transform: 'translateX(100%)'
          }
        },
        vanishLeft: {
          '0%': {
            transform: 'translateX(0%)'
          },
          '25%': {
            transform: 'translateX(-25%)',
          },
          '50%': {
            transform: 'translateX(-50%)'
          },
          '75%': {
            transform: 'translateX(-75%)'
          },
          '100%': {
            transform: 'translateX(-100%)'
          }
        },
        moveDown: {
          '0%': {
            transform: 'translateY(-60%)'
          },
          '100%': {
            transform: 'translateY(0)'
          }
        },
        moveHeaderDown: {
          '0%': {
            transform: 'translateY(-30%)',
            zIndex: '-10'
          },
          '50%': {
            transform: 'translateY(0)',
            zIndex: '-10'
          },
          '100%': {
            transform: 'translateY(0)',
            zIndex: '50'
          }
        },
        jump: {
          '0%': {
            transform: 'translateY(-40%)'
          },
          '25%': {
            transform: 'translateY(0%)',
          },
          '50%': {
            transform: 'translateY(-10%)'
          },
          '75%': {
            transform: 'translateY(-5%)'
          },
          '100%': {
            transform: 'translateY(0)'
          }
        },
        jumpLeft: {
          '0%': {
            transform: 'translateX(80%)'
          },
          '25%': {
            transform: 'translateX(0%)',
          },
          '50%': {
            transform: 'translateX(15%)'
          },
          '75%': {
            transform: 'translateX(10%)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        moveUp: {
          '0%': {
            transform: 'translateY(60%)'
          },
          '25%': {
            transform: 'translateY(50%)',
          },
          '50%': {
            transform: 'translateY(30%)'
          },
          '75%': {
            transform: 'translateY(15%)'
          },
          '100%': {
            transform: 'translateY(0)'
          }
        },
        leftRight: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '25%': {
            transform: 'rotate(-5deg)',
          },
          '50%': {
            transform: 'rotate(0deg)'
          },
          '75%': {
            transform: 'rotate(5deg)'
          },
          '100%': {
            transform: 'rotate(0deg)'
          }
        },
        dropdownOpen: {
          '0%': {
            transform: 'scaleY(0)',
            maxHeight: "0%"
          },
          '100%': {
            transform: 'scaleY(1)',
            maxHeight: "fit-content"
          }
        },
        dropdownClose: {
          '0%': {
            transform: 'scaleY(1)',
            maxHeight: "fit-content"
          },
          '100%': {
            transform: 'scaleY(0)',
            maxHeight: "0%"
          }
        },
        fade: {
          '0%': {
            opacity: '100%'
          },
          '100%': {
            opacity: '0%'
          }
        }
      },
      animation: {
        'loader': 'loading 1s linear infinite alternate',
        'moveLeft': 'moveLeft 0.5s linear',
        'moveDown': 'moveDown 0.5s linear',
        'moveHeaderDown': 'moveHeaderDown 0.4s linear',
        'moveRight': 'moveRight 0.5s linear',
        'slideRight': 'slideRight 1s linear',
        'slideLeft': 'slideLeft 1s linear',
        'vanishRight': 'vanishRight 0.5s linear',
        'vanishLeft': 'vanishLeft 0.5s linear',
        'moveUp': 'moveUp 0.5s linear',
        'jump': 'jump 1.5s linear',
        'jumpLeft': 'jumpLeft 1.5s linear',
        'leftRight': 'leftRight 2s linear',
        'dropdownOpen': 'dropdownOpen 0.5s ease-in-out forwards',
        'dropdownClose': 'dropdownClose 0.5s ease-in forwards',
        'fade': 'fade 4s linear',
        'fadeLonger': 'fade 8s linear',
        'fadeShorter': 'fade 2s linear',
        'scale': 'scale 7s alternate infinite',
        'skeletonLoading': 'loading 1s alternate infinite'

      }
    },
    plugins: [
      plugin(function ({ addUtilities }) {
        addUtilities({
          ".scrollbar-hide": {
            /* IE and Edge */
            "-ms-overflow-style": "none",

            /* Firefox */
            "scrollbar-width": "none",

            /* Safari and Chrome */
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
        });
      }),
    ],
  }
}
