
import tensorflow as tf

x1 = tf.constant([1, 2, 3, 4])
x2 = tf.constant([5, 6, 7, 8])

result = tf.multiply(x1, x2) #here the multiplication will not actually be calculated. it just defines an abstract tensor. This is called lazy evaluation.
print(result)

#######
#if we want to calculate the result, we can do it like this:
#######
sess = tf.Session() # Do note that here Session has a capital S
print(sess.run(result))
sess.close()

#alternate way to deal with session
with tf.Session as sess:
    output = sess.run(result)
    print(output)

