import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { forwardRef, useMemo } from 'react'
import colors from 'tailwindcss/colors'

import { BlurBackdrop } from './BlurBackdrop'

type ModalProps = {
  children: React.ReactNode
  heightPercentage: string
}

const Modal = forwardRef<BottomSheetModal, ModalProps>(
  ({ children, heightPercentage }, ref) => {
    const snapPoints = useMemo(() => [heightPercentage], [heightPercentage])

    return (
      <BottomSheetModal
        backdropComponent={BlurBackdrop}
        backgroundStyle={{
          backgroundColor: colors.gray[900],
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.gray[100],
        }}
        enablePanDownToClose
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        // onChange={handleSheetChanges}
      >
        <BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
      </BottomSheetModal>
    )
  },
)

Modal.displayName = 'Modal'

export { Modal }
