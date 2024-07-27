from .serializers import CartSerializer
from rest_framework import generics, status, serializers
from rest_framework.response import Response
from .models import Cart
from apps.users.models import User
from apps.products.models import Products
from .serializers import CartListSerializer, CartSerializer, CartUpdateSerializer
from django_filters.rest_framework import DjangoFilterBackend
from config.helpers.error_response import error_response
from apps.users.mixins import CustomLoginRequiredMixin
# Create your views here.

class CartListView(CustomLoginRequiredMixin, generics.ListAPIView):
    serializer_class= CartListSerializer
    def get_queryset(self):
        return Cart.objects.filter(user=self.request.login_user.id)
    # sin esto le da la pagina lleno de otros 
    #getserclass
    
    
    
class CartAdd( CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset=Cart.objects.all()
    serializer_class=CartSerializer
    
    def post(self, request, *args, **kwargs):
        
        self.get_serializer_class().validate(self, request.data)

        product = Products.objects.filter(id=request.data['product']).first()
        if (product is None):
            return error_response('product not found.', status.HTTP_400_BAD_REQUEST)

        cart = Cart.objects.filter(product_id=request.data['product'], user_id=request.login_user.id).first()
        if (cart is not None):
            return error_response('Cart already existed.', status.HTTP_400_BAD_REQUEST)

        new_cart = Cart.objects.create(
            user = User.objects.get(id=request.login_user.id),
            product = product,
            quantity = int( request.data['quantity'] )
        )

        # Convert Model to Serializer
        serializer = CartListSerializer(new_cart)

        # Response data as Dict
        return Response(serializer.data)

    
    
    
    
    
class CartUpdate(CustomLoginRequiredMixin, generics.UpdateAPIView):
    queryset= Cart.objects.all()
    serializer_class = CartUpdateSerializer
    lookup_field = 'id'
    
     
    def put(self, request, *args, **kwargs):
        self.get_serializer_class().validate(self, request.data)
        
        quantity = int(request.data['quantity'])
        
        id = self.kwargs['id']
        cart = Cart.objects.filter(id=id)
        if (cart is None):
            return error_response('Cart not found', status.HTTP_400_BAD_REQUEST)
        if quantity < 1 : 
            cart.delete()
            return Response({'message': 'cart deleted successful'})
        cart.update(quantity = quantity)
        serializer = CartListSerializer(cart[0])
        return Response(serializer.data)
    
        
        
  
        
    # def post(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)  # Validate the serializer
        
    #     product_id = request.data.get('product')
    #     product = Products.objects.filter(id=product_id).first()
    #     if product is None:
    #         return error_response('Product not found', status.HTTP_400_BAD_REQUEST)
        
    #     cart = Cart.objects.filter(product_id=product_id, user=request.login_user).first()
    #     if cart:
    #         # Cart already exists for the product, update quantity instead of creating a new one
    #         cart.quantity += int(request.data['quantity'])
    #         cart.save()
    #     else:
    #         # Create a new cart instance
    #         serializer.save(user=request.login_user, product=product)
        
    #     return Response(serializer.data)
    